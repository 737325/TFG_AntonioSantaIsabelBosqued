
package com.servidorAPELV.springbootServer.entity;

import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author Antonio Santa Isabel <asanta@turomas.com>
 */
@Entity
@Table(name = "plantillas")
public class Plantilla implements Serializable{    
        
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_plantilla")
    private Long id_plantilla;
    
    @Column(length = 50)
    private String nombre;
    
    @Column(length = 50)
    private String proveedor;
    
    @Column(length = 50)
    private Long ancho;
    
    @Column(length = 50)
    private Long alto;
    
    @OneToMany(mappedBy = "plantilla", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Campo> campos;   
    
    public Long getId() {
        return id_plantilla;
    }

    public void setId(Long id) {
        this.id_plantilla = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getProveedor() {
        return proveedor;
    }

    public void setProveedor(String proveedor) {
        this.proveedor = proveedor;
    }

    public Long getAncho() {
        return ancho;
    }

    public void setAncho(Long ancho) {
        this.ancho = ancho;
    }

    public Long getAlto() {
        return alto;
    }

    public void setAlto(Long alto) {
        this.alto = alto;
    }
    
    

    public List<Campo> getCampos() {
        return campos;
    }

    public void setCampos(List<Campo> campos) {
        this.campos = campos;
    }

}
