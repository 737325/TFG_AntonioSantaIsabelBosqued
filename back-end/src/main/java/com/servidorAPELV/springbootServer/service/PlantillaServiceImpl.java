/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.servidorAPELV.springbootServer.service;

import com.servidorAPELV.springbootServer.entity.Plantilla;
import com.servidorAPELV.springbootServer.repository.PlantillaRepository;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Antonio Santa Isabel <asanta@turomas.com>
 */
@Service
public class PlantillaServiceImpl implements PlantillaService{

    @Autowired
    private PlantillaRepository plantillaRepository; 
    
    @Override
    @Transactional(readOnly = true)
    public Iterable<Plantilla> findAll() {        
        return plantillaRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Plantilla> findAll(Pageable pageable) {        
        return plantillaRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Plantilla> findById(Long id) {
        return plantillaRepository.findById(id);
    }

    @Override
    @Transactional
    public Plantilla save(Plantilla plantilla) {        
        return plantillaRepository.save(plantilla);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        plantillaRepository.deleteById(id);
    }
    
}
