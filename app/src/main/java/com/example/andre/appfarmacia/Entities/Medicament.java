package com.example.andre.appfarmacia.Entities;

import android.os.Parcel;
import android.os.Parcelable;


/**
 * Created by andre on 9/04/2018.
 */

public class Medicament implements Parcelable {
    private String nombre;
    private String description;
    private int units;
    private String image;
    private boolean mobile;


    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getUnits() {
        return units;
    }

    public void setUnits(int units) {
        this.units = units;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public boolean isMobile() {
        return mobile;
    }

    public void setMobile(boolean mobile) {
        this.mobile = mobile;
    }


    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(this.nombre);
        dest.writeString(this.description);
        dest.writeInt(this.units);
        dest.writeString(this.image);
        dest.writeByte(this.mobile ? (byte) 1 : (byte) 0);
    }

    public Medicament() {
    }

    protected Medicament(Parcel in) {
        this.nombre = in.readString();
        this.description = in.readString();
        this.units = in.readInt();
        this.image = in.readString();
        this.mobile = in.readByte() != 0;
    }

    public static final Parcelable.Creator<Medicament> CREATOR = new Parcelable.Creator<Medicament>() {
        @Override
        public Medicament createFromParcel(Parcel source) {
            return new Medicament(source);
        }

        @Override
        public Medicament[] newArray(int size) {
            return new Medicament[size];
        }
    };
}
