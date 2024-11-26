package com.application.server.repositories;

import com.application.server.entities.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogRepo extends JpaRepository<Blog, String>{
    //define custom query methods here if needed
}