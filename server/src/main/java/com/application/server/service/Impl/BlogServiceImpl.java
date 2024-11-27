package com.application.server.service.Impl;

import com.application.server.entities.Blog;
import com.application.server.repositories.BlogRepo;
import com.application.server.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class BlogServiceImpl implements BlogService {

    @Autowired
    private BlogRepo blogRepo;

    @Override
    public Blog createBlog(Blog blog) {
        String userId = UUID.randomUUID().toString();
        blog.setId(userId);
        return blogRepo.save(blog);
    }

    @Override
    public Blog updateBlog(String id, Blog blog) {
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
            throw new RuntimeException("Blog not found with id " + id);
        }
    }

    @Override
    public void deleteBlog(String id) {
        blogRepo.deleteById(id);
    }

    @Override
    public Optional<Blog> getBlogById(String id) {
        return blogRepo.findById(id);
    }

    @Override
    public List<Blog> getAllBlogs() {
        return blogRepo.findAll();
    }

    @Override
    public List<Blog> getBlogsByUserId(String userId) {
        return blogRepo.findAll().stream()
                .filter(blog -> blog.getUser().getId().equals(userId))
                .toList();
    }
}
