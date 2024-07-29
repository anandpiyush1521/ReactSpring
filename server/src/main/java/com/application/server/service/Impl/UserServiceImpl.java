package com.application.server.service.Impl;

import com.application.server.entities.TempUser;
import com.application.server.entities.User;
import com.application.server.helpers.PasswordBcrypt;
import com.application.server.helpers.ResourceNotFoundException;
import com.application.server.repositories.UserRepo;
import com.application.server.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
@AllArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private EmailService emailService;

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    private final ConcurrentHashMap<String, TempUser> tempUserStore = new ConcurrentHashMap<>();

    @Override
    public User saveUser(User user) {
        String userId = UUID.randomUUID().toString();
        user.setId(userId);

        String hashPassword = PasswordBcrypt.hashPassword(user.getPassword());
        user.setPassword(hashPassword);
        user.setRepeat_password(hashPassword);

        return userRepo.save(user);

    }

    @Override
    public Optional<User> getUserById(String id) {
        return userRepo.findById(id);
    }

    @Override
    public Optional<User> updateUser(User user) {
        User user2 = userRepo.findById(user.getId()).orElseThrow(() ->new ResourceNotFoundException("User not found"));
        user2.setEmail(user.getEmail());

        String hashPassword = PasswordBcrypt.hashPassword(user.getPassword());
        user2.setPassword(hashPassword);
        user2.setRepeat_password(hashPassword);
        user2.setFirst_name(user.getFirst_name());
        user2.setLast_name(user.getLast_name());
        user2.setPhone(user.getPhone());
        user2.setAddress(user.getAddress());
        user2.setEmailVerified(user.isEmailVerified());

        //save the updated user
        User save = userRepo.save(user2);

        return Optional.ofNullable(save);
    }

    @Override
    public void deleteUser(String id) {
        User user = userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not Found"));
        userRepo.delete(user);
    }

    @Override
    public boolean isUserExistByEmail(String email) {
        User user = userRepo.findByEmail(email).orElse(null);
        return user!=null ? true : false;
    }

    @Override
    public boolean isUserExistByEmailAndPassword(String email, String password) {
        User user = userRepo.findByEmailAndPassword(email, password).orElse(null);
        return user!=null ? true : false;
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    @Override
    public User register(User user) {
        User existingUser = userRepo.findByEmail(user.getEmail()).orElse(null);
        if(existingUser!=null && existingUser.isEmailVerified()){
            throw new RuntimeException("User already exist and verified");
        }

        TempUser tempUser = new TempUser(
                UUID.randomUUID().toString(),
                user.getEmail(),
                user.getPassword(),
                user.getRepeat_password(),
                user.getFirst_name(),
                user.getLast_name(),
                user.getPhone(),
                user.getAddress(),
                generateOtp(),
                LocalDateTime.now()
        );

        //Store the temporary user object in the map
        tempUserStore.put(tempUser.getEmail(), tempUser);

        sendVerificationEmail(tempUser.getEmail(), tempUser.getOtp());

        logger.info("User registered successfully, please verify your email");

        return User.builder()
                .email(tempUser.getEmail())
                .first_name(tempUser.getFirst_name())
                .last_name(tempUser.getLast_name())
                .phone(tempUser.getPhone())
                .address(tempUser.getAddress())
                .build();

    }

    @Override
    public void verify(String email, String otp) {
        TempUser tempUser = tempUserStore.get(email);

        if(tempUser == null){
            logger.warn("User Not Found");
            throw new RuntimeException("User Not Found");
        }else if(!otp.equals(tempUser.getOtp())){
            logger.warn("Invalid Otp");
            throw new RuntimeException("Invalid Otp");
        }else if(tempUser.getOtpGeneratedTime().plusMinutes(2).isBefore(LocalDateTime.now())){
            logger.warn("OTP expired");
            throw new RuntimeException("OTP expired");
        }else{
            String hashPassword = PasswordBcrypt.hashPassword(tempUser.getPassword());
            User user = User.builder()
                    .id(UUID.randomUUID().toString())
                    .email(tempUser.getEmail())
                    .password(hashPassword)
                    .repeat_password(hashPassword)
                    .first_name(tempUser.getFirst_name())
                    .last_name(tempUser.getLast_name())
                    .phone(tempUser.getPhone())
                    .address(tempUser.getAddress())
                    .otp(tempUser.getOtp())
                    .isEmailVerified(true)
                    .localDateTime(LocalDateTime.now())
                    .build();

            logger.info("User verified successfully");

            userRepo.save(user);

            tempUserStore.remove(email);  // remove temporary user
        }
    }

    @Override
    public User login(String email, String password) {
        Optional<User> optionalUser = userRepo.findByEmail(email);
        if(optionalUser.isPresent()){
            User existingUser = optionalUser.get();
            if(PasswordBcrypt.checkPassword(password, existingUser.getPassword())) {
                logger.info("User logged in successfully");
                return existingUser;
            }else{
                logger.warn("Invalid Password");
                throw new RuntimeException("Invalid Password");
            }
        }else{
            logger.warn("User Does not exist");
            throw new RuntimeException("User Does not exist");
        }
    }

    private String generateOtp(){
        Random random = new Random();
        int otpValue = 100000 + random.nextInt(900000);
        return String.valueOf(otpValue);
    }

    private void sendVerificationEmail(String email, String otp){
        String subject = "Email Verification: PayerUp!!!";
        String body = "Your verification otp is: "+otp;
        emailService.sendEmail(email, subject, body);
    }
}
