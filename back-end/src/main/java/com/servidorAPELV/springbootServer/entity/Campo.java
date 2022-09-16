
package com.servidorAPELV.springbootServer.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

/**
 *
 * @author Antonio Santa Isabel <asanta@turomas.com>
 */
@Entity
@Table(name = "campos")
public class Campo implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_campo")
    private Long id_campo;
    
    @Column()
    private String campoNombre;
    
    @Column()
    private double left;
    
    @Column()
    private double top;
    
    @Column()
    private double width;
    
    @Column()
    private double height;
    
    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name="id_plantilla", referencedColumnName="id_plantilla",
                insertable=false, updatable=false)
    private Plantilla plantilla;
    
    
    public Long getId_campo() {
        return id_campo;
    }

    public void setId_campo(Long id_campo) {
        this.id_campo = id_campo;
    }

    public String getCampoNombre() {
        return campoNombre;
    }

    public void setCampoNombre(String campoNombre) {
        this.campoNombre = campoNombre;
    }    
    /* FIN OPCION B */

    public double getLeft() {
        return left;
    }

    public void setLeft(double left) {
        this.left = left;
    }

    public double getTop() {
        return top;
    }

    public void setTop(double top) {
        this.top = top;
    }

    public double getWidth() {
        return width;
    }

    public void setWidth(double width) {
        this.width = width;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }
    


    public Plantilla getPlantilla() {
        return plantilla;
    }

    public void setPlantilla(Plantilla plantilla) {
        this.plantilla = plantilla;
    }
    
}
