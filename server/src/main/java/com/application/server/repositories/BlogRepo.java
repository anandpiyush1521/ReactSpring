package com.application.server.repositories;

import com.application.server.entities.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepo extends JpaRepository<Blog, String>{
    //define custom query methods here if needed
    List<Blog> findByUserId(String userId);

    @Query("SELECT b FROM Blog b JOIN b.sections s WHERE LOWER(s) LIKE LOWER(CONCAT('%', :sectionContent, '%'))")
    List<Blog> findBySectionContent(@Param("sectionContent") String sectionContent);
}