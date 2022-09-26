/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.service;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Areeb
 */
@Entity
@Table(name = "SOLDPRODUCT")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Soldproduct.findAll", query = "SELECT s FROM Soldproduct s"),
    @NamedQuery(name = "Soldproduct.findById", query = "SELECT s FROM Soldproduct s WHERE s.id = :id"),
    @NamedQuery(name = "Soldproduct.findByNamen", query = "SELECT s FROM Soldproduct s WHERE s.namen = :namen"),
    @NamedQuery(name = "Soldproduct.findByCategory", query = "SELECT s FROM Soldproduct s WHERE s.category = :category"),
    @NamedQuery(name = "Soldproduct.findByPrice", query = "SELECT s FROM Soldproduct s WHERE s.price = :price"),
    @NamedQuery(name = "Soldproduct.findByUnits", query = "SELECT s FROM Soldproduct s WHERE s.units = :units"),
    @NamedQuery(name = "Soldproduct.findByCompany", query = "SELECT s FROM Soldproduct s WHERE s.company = :company"),
    @NamedQuery(name = "Soldproduct.findByPid", query = "SELECT s FROM Soldproduct s WHERE s.pid = :pid")})
public class Soldproduct implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ID")
    private Integer id;
    @Size(max = 20)
    @Column(name = "NAMEN")
    private String namen;
    @Size(max = 20)
    @Column(name = "CATEGORY")
    private String category;
    @Column(name = "PRICE")
    private Integer price;
    @Column(name = "UNITS")
    private Integer units;
    @Size(max = 20)
    @Column(name = "COMPANY")
    private String company;
    @Column(name = "PID")
    private Integer pid;

    public Soldproduct() {
    }

    public Soldproduct(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNamen() {
        return namen;
    }

    public void setNamen(String namen) {
        this.namen = namen;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getUnits() {
        return units;
    }

    public void setUnits(Integer units) {
        this.units = units;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public Integer getPid() {
        return pid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Soldproduct)) {
            return false;
        }
        Soldproduct other = (Soldproduct) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.service.Soldproduct[ id=" + id + " ]";
    }
    
}
