package com.example.andre.appfarmacia;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.util.Log;
import android.view.View;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.example.andre.appfarmacia.Entities.Medicament;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MainActivity extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener {

    private RequestQueue requestQueue;
    private String urlMedicaments = "https://solicitud-medicamentos-unnamed.herokuapp.com/producto/list?origen=mobile";
    private Medicament medicaments;
    private Gson gsonMedicaments;
    private List<Medicament> listMedicaments;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        gsonMedicaments = new Gson();

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.addDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);
    }

    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        // Handle navigation view item clicks here.
        int id = item.getItemId();

        if (id == R.id.nav_camera) {
            Intent intent1 = new Intent(this, MedicinesActivity.class);
            startActivity(intent1);
            // Handle the camera action
        } else if (id == R.id.nav_gallery) {

            allMedicaments();
            /*Intent intent2 = new Intent(this,MedicamentsActivity.class);
            startActivity(intent2);*/
        } else if (id == R.id.nav_slideshow) {

        } else if (id == R.id.nav_manage) {

        } else if (id == R.id.nav_share) {

        } else if (id == R.id.nav_send) {

        }

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }

    public void allMedicaments() {
        requestQueue = Volley.newRequestQueue(this);
        /*JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET, urlMedicaments, null,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        medicaments = gsonMedicaments.fromJson(response,Medicament.class);
                        listMedicaments = gsonMedicaments.fromJson();
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {

                    }
                });*/
        StringRequest medicamentsRequest = new StringRequest(Request.Method.GET, urlMedicaments,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        Log.d("med", response);

                        /*JsonParser jsonParser = new JsonParser();
                        JsonObject jo = (JsonObject) jsonParser.parse(response);
                        JsonArray jsonArray = jo.ge*/
                        Medicament[] meds = gsonMedicaments.fromJson(response,Medicament[].class);
                        ArrayList<Medicament> arrayList = new ArrayList<>(Arrays.asList(meds));
                        for (int i = 0; i<arrayList.size();i++){
                            Log.d("medic",arrayList.get(i).toString());
                        }
                        //medicaments = gsonMedicaments.fromJson(response,Medicament.class);
                        Intent intent = new Intent(getApplicationContext(),MedicamentsActivity.class);
                        intent.putParcelableArrayListExtra("medsObject",arrayList);
                        //intent.putExtra("medsObject",meds);
                        startActivity(intent);
                    }
                }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.d("error",error.toString());
                    }
                });
        requestQueue.add(medicamentsRequest);
    }
}
