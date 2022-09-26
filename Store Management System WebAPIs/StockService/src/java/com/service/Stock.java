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
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Areeb
 */
@Entity
@Table(name = "STOCK")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Stock.findAll", query = "SELECT s FROM Stock s"),
    @NamedQuery(name = "Stock.findById", query = "SELECT s FROM Stock s WHERE s.id = :id"),
    @NamedQuery(name = "Stock.findByNamen", query = "SELECT s FROM Stock s WHERE s.namen = :namen"),
    @NamedQuery(name = "Stock.findByCategory", query = "SELECT s FROM Stock s WHERE s.category = :category"),
    @NamedQuery(name = "Stock.findByPurchaseprice", query = "SELECT s FROM Stock s WHERE s.purchaseprice = :purchaseprice"),
    @NamedQuery(name = "Stock.findBySaleprice", query = "SELECT s FROM Stock s WHERE s.saleprice = :saleprice"),
    @NamedQuery(name = "Stock.findByUnits", query = "SELECT s FROM Stock s WHERE s.units = :units"),
    @NamedQuery(name = "Stock.findByCompany", query = "SELECT s FROM Stock s WHERE s.company = :company"),
    @NamedQuery(name = "Stock.findByPl", query = "SELECT s FROM Stock s WHERE s.pl = :pl")})
public class Stock implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "ID")
    private Integer id;
    @Size(max = 20)
    @Column(name = "NAMEN")
    private String namen;
    @Size(max = 20)
    @Column(name = "CATEGORY")
    private String category;
    @Column(name = "PURCHASEPRICE")
    private Integer purchaseprice;
    @Column(name = "SALEPRICE")
    private Integer saleprice;
    @Column(name = "UNITS")
    private Integer units;
    @Size(max = 20)
    @Column(name = "COMPANY")
    private String company;
    @Column(name = "PL")
    private Integer pl;

    public Stock() {
    }

    public Stock(Integer id) {
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

    public Integer getPurchaseprice() {
        return purchaseprice;
    }

    public void setPurchaseprice(Integer purchaseprice) {
        this.purchaseprice = purchaseprice;
    }

    public Integer getSaleprice() {
        return saleprice;
    }

    public void setSaleprice(Integer saleprice) {
        this.saleprice = saleprice;
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

    public Integer getPl() {
        return pl;
    }

    public void setPl(Integer pl) {
        this.pl = pl;
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
        if (!(object instanceof Stock)) {
            return false;
        }
        Stock other = (Stock) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.service.Stock[ id=" + id + " ]";
    }
    
}
