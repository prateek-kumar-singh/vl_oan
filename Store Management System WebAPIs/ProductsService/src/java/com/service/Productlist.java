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
@Table(name = "PRODUCTLIST")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Productlist.findAll", query = "SELECT p FROM Productlist p"),
    @NamedQuery(name = "Productlist.findById", query = "SELECT p FROM Productlist p WHERE p.id = :id"),
    @NamedQuery(name = "Productlist.findByNamen", query = "SELECT p FROM Productlist p WHERE p.namen = :namen"),
    @NamedQuery(name = "Productlist.findByCategory", query = "SELECT p FROM Productlist p WHERE p.category = :category"),
    @NamedQuery(name = "Productlist.findByCompany", query = "SELECT p FROM Productlist p WHERE p.company = :company")})
public class Productlist implements Serializable {
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
    @Size(max = 20)
    @Column(name = "COMPANY")
    private String company;

    public Productlist() {
    }

    public Productlist(Integer id) {
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

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
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
        if (!(object instanceof Productlist)) {
            return false;
        }
        Productlist other = (Productlist) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.service.Productlist[ id=" + id + " ]";
    }
    
}
