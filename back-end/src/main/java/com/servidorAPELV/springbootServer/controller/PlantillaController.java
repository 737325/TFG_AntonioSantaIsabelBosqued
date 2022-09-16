/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.servidorAPELV.springbootServer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

import com.servidorAPELV.springbootServer.entity.Plantilla;
import com.servidorAPELV.springbootServer.service.PlantillaService;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.springframework.web.bind.annotation.CrossOrigin;





/**
 *
 * @author Antonio Santa Isabel <asanta@turomas.com>
 */
@RestController
@RequestMapping("/api/plantillas")
@CrossOrigin
public class PlantillaController {
    
    @Autowired
    private PlantillaService plantillaService;
    
    // Crear una nueva Plantilla
    @PostMapping
    public ResponseEntity<?> create (@RequestBody Plantilla plantilla){
        //plantilla.actualizarCampos();       
        return ResponseEntity.status(HttpStatus.CREATED).body(plantillaService.save(plantilla));
    }
    
    //Leer una Plantilla
    @GetMapping("/{id}")
    public ResponseEntity<?> read(@PathVariable (value = "id") Long plantillaId){
        Optional<Plantilla> oPlantilla = plantillaService.findById(plantillaId);
        
        if(!oPlantilla.isPresent()){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(oPlantilla);
    }    
    
    //Actualizar una Plantilla
    @PutMapping("/{id}")
    public ResponseEntity<?> update (@RequestBody Plantilla pDetails, @PathVariable Long id){
        Optional<Plantilla> plantilla = plantillaService.findById(id);
        
        if(!plantilla.isPresent()){
            return ResponseEntity.notFound().build();
        }
     
        plantilla.get().setNombre(pDetails.getNombre());
        plantilla.get().setProveedor(pDetails.getProveedor());
        
        return ResponseEntity.status(HttpStatus.CREATED).body(plantillaService.save(plantilla.get()));
    }
    
    //Borrar Plantilla
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete (@PathVariable (value = "id") Long plantillaId){
        if(!plantillaService.findById(plantillaId).isPresent()){
            return ResponseEntity.notFound().build();
        }
        
        plantillaService.deleteById(plantillaId);
        return ResponseEntity.ok().build();
    }   
    
    //Obtener todas las Plantillas
    @GetMapping
    public List<Plantilla> readAll(){     
        /*
        * Itera secuencialmente sobre los elementos del Iterable.
        * collect los une en una lista
        */
        List<Plantilla> plantillas = StreamSupport
                .stream(plantillaService.findAll().spliterator(), false)
                .collect(Collectors.toList());
                
        return plantillas;
    }
}
