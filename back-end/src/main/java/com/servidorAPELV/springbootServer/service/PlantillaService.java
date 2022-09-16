package com.servidorAPELV.springbootServer.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.servidorAPELV.springbootServer.entity.Plantilla;

/**
 *
 * @author Antonio Santa Isabel <asanta@turomas.com>
 */
public interface PlantillaService {
    
    public Iterable<Plantilla> findAll();
    
    public Page<Plantilla> findAll(Pageable pageable);
    
    public Optional<Plantilla> findById(Long id);
    
    public Plantilla save(Plantilla plantilla);
    
    public void deleteById(Long id);
    
}
