package com.application.server.service.Impl;

import com.application.server.entities.Blog;
import com.application.server.entities.User;
import com.application.server.repositories.BlogRepo;
import com.application.server.repositories.UserRepo;
import com.application.server.service.BlogService;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class BlogServiceImpl implements BlogService {

    @Autowired
    private BlogRepo blogRepo;

    @Autowired
    private UserRepo userRepo;

    private static final Logger logger = LoggerFactory.getLogger(BlogServiceImpl.class);

    @Override
    public Blog createBlog(Blog blog) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;

        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else if (principal instanceof String && principal.equals("anonymousUser")) {
            logger.error("User is not authenticated");
            throw new RuntimeException("User is not authenticated");
        } else {
            username = principal.toString();
        }

        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username " + username));

        blog.setUser(user);
        blog.setId(UUID.randomUUID().toString());
        Blog savedBlog = blogRepo.save(blog);
        logger.info(username + " created a new blog with id " + savedBlog.getId());
        return savedBlog;
    }

    @Override
    public Blog updateBlog(String id, Blog blog) {
        logger.info("Updating blog with id " + id);
        Optional<Blog> existingBlogOptional = blogRepo.findById(id);
        if (existingBlogOptional.isPresent()) {
            Blog existingBlog = existingBlogOptional.get();
            existingBlog.setTitle(blog.getTitle());
            existingBlog.setContent(blog.getContent());
            existingBlog.setBannerPath(blog.getBannerPath());
            existingBlog.setImagePath(blog.getImagePath());
            existingBlog.setSections(blog.getSections());
            existingBlog.setUser(blog.getUser());
            existingBlog.setUpdatedAt(blog.getUpdatedAt());
            return blogRepo.save(existingBlog);
        } else {
            logger.error("Blog not found with id " + id);
            throw new RuntimeException("Blog not found with id " + id);
        }
    }

    @Override
    public void deleteBlog(String id) {
        logger.info("Deleting blog with id " + id);
        blogRepo.deleteById(id);
        logger.info("Blog deleted successfully");
    }

    @Override
    public Optional<Blog> getBlogById(String id) {
        logger.info("Fetching blog with id " + id);
        return blogRepo.findById(id);
    }

    @Override
    public List<Blog> getAllBlogs() {
        logger.info("Fetching all blogs");
        return blogRepo.findAll();
    }

    @Override
    public List<Blog> getBlogsByUserId(String userId) {
        logger.info("Fetching blogs by user id " + userId);
        return blogRepo.findByUserId(userId);
    }

    @Override
    public List<Blog> searchBlogsBySectionContent(String sectionContent) {
        return blogRepo.findBySectionContent(sectionContent);
    }
}