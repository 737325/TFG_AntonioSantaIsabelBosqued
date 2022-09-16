package com.servidorAPELV.springbootServer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.servidorAPELV.springbootServer.entity.Plantilla;

/**
 *
 * @author Antonio Santa Isabel <asanta@turomas.com>
 */
@Repository
public interface PlantillaRepository extends JpaRepository<Plantilla, Long>{
    
}
