package com.application.server.controller;

import com.application.server.entities.Blog;
import com.application.server.helpers.FileUploader;
import com.application.server.service.BlogService;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/blogs")
public class BlogController {

    @Autowired
    private BlogService blogService;

    // @PostMapping
    // public ResponseEntity<Blog> createBlog(@RequestBody Blog blog) {
    //     Blog createdBlog = blogService.createBlog(blog);
    //     return ResponseEntity.ok(createdBlog);
    // }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<Blog> createBlog(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("bannerPath") MultipartFile bannerPath,
            @RequestParam("imagePath") MultipartFile imagePath,
            @RequestParam("sections") String sectionsJson // JSON string for sections
    ) throws IOException {

        // Parse sections JSON string to List<String>
        ObjectMapper objectMapper = new ObjectMapper();
        List<String> sections = objectMapper.readValue(sectionsJson, List.class);

        // Save files
        String bannerFilePath = FileUploader.saveFile(bannerPath);
        String imageFilePath = FileUploader.saveFile(imagePath);

        // Create a new Blog object
        Blog blog = new Blog();
        blog.setTitle(title);
        blog.setContent(content);
        blog.setBannerPath(bannerFilePath);
        blog.setImagePath(imageFilePath);
        blog.setSections(sections);

        // Save the blog using the service
        Blog createdBlog = blogService.createBlog(blog);
        return ResponseEntity.ok(createdBlog);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Blog> updateBlog(@PathVariable String id, @RequestBody Blog blog) {
        Blog updatedBlog = blogService.updateBlog(id, blog);
        return ResponseEntity.ok(updatedBlog);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable String id) {
        blogService.deleteBlog(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Blog> getBlogById(@PathVariable String id) {
        Optional<Blog> blog = blogService.getBlogById(id);
        return blog.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Blog>> getAllBlogs() {
        List<Blog> blogs = blogService.getAllBlogs();
        return ResponseEntity.ok(blogs);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Blog>> getBlogsByUserId(@PathVariable String userId) {
        List<Blog> blogs = blogService.getBlogsByUserId(userId);
        return ResponseEntity.ok(blogs);
    }

    //http://localhost:8080/api/blogs/search?sectionContent=dfs
    @GetMapping("/search") 
    public List<Blog> searchBlogs(@RequestParam String sectionContent) {
        return blogService.searchBlogsBySectionContent(sectionContent);
    }
}

