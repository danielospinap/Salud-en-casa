package com.example.andre.appfarmacia;

import android.content.Context;
import android.content.Intent;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.GridView;
import android.widget.ListView;
import android.widget.Toast;

import com.example.andre.appfarmacia.Entities.Medicament;

import java.util.ArrayList;

public class MedicamentsActivity extends AppCompatActivity {

    private GridView gridView;
    private ListView listView;
    private  String[] array;
    private Medicament[] medicaments;
    private ArrayList<Medicament> meds;
    private AdapterView.OnItemClickListener onItemClickListener;
    private Fragment fragment;
    private FragmentTransaction fragmentTransaction;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_medicaments);

        meds = getIntent().getParcelableArrayListExtra("medsObject");
        String[] arraynames  = new String[meds.size()];
        for (int i =0;i<meds.size();i++){
            arraynames[i] = meds.get(i).getNombre();
        }

        medicaments = meds.toArray(new Medicament[meds.size()]);

        gridView = findViewById(R.id.grid_view);

        array = new String[]{"asd", "sda","fdsfs","fgsfa","dsadsadssd","dsfadf","hgfhdgsffsddgfghhg","gfdgfr","75yh6y45gb"};
        ArrayAdapter<String>  adapter = new ArrayAdapter<String>(this,
                android.R.layout.simple_expandable_list_item_1,arraynames);

        /*ArrayAdapter<Medicament>  adapter1= new ArrayAdapter<Medicament>(this,
                android.R.layout.simple_expandable_list_item_1,medicaments);*/

        onItemClickListener = new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                fragment = new MedicamentFragment();
                Bundle args = new Bundle();
                args.putParcelable("medicament",medicaments[position]);
                fragment.setArguments(args);
                fragmentTransaction = getSupportFragmentManager().beginTransaction();
                fragmentTransaction.add(R.id.fragmentContainerMeds,fragment);
                fragmentTransaction.addToBackStack(null);
                fragmentTransaction.commit();
            }
        };
        gridView.setAdapter(adapter);
        gridView.setOnItemClickListener(onItemClickListener);
    }
}
