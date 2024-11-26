package com.application.server.service;

import com.application.server.entities.Blog;
import java.util.List;
import java.util.Optional;

public interface BlogService {
    Blog createBlog(Blog blog);
    Blog updateBlog(String id, Blog blog);
    void deleteBlog(String id);
    Optional<Blog> getBlogById(String id);
    List<Blog> getAllBlogs();
    List<Blog> getBlogsByUserId(String userId);
}