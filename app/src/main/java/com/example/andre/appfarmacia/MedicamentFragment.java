package com.example.andre.appfarmacia;


import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.andre.appfarmacia.Entities.Medicament;


/**
 * A simple {@link Fragment} subclass.
 */
public class MedicamentFragment extends Fragment {


    private TextView textViewName;
    private TextView textViewDesc;
    private TextView textViewUnits;
    private TextView textViewImage;
    private TextView textViewMobile;

    public MedicamentFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment

        View view = inflater.inflate(R.layout.fragment_medicament, container, false);
        textViewName = view.findViewById(R.id.nameMedicament);
        textViewDesc = view.findViewById(R.id.descriptionMedicament);
        textViewUnits = view.findViewById(R.id.unitsMedicament);
        textViewImage = view.findViewById(R.id.imageMedicament);


        Medicament medicament = getArguments().getParcelable("medicament");

        textViewName.setText(medicament.getNombre());
        textViewDesc.setText(medicament.getDescription());
        //textViewUnits.setText(medicament.getUnits());
        textViewImage.setText(medicament.getImage());

        return view;

    }

}
