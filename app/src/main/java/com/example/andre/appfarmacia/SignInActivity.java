package com.example.andre.appfarmacia;

import android.content.Intent;
import android.net.Uri;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;


public class SignInActivity extends AppCompatActivity {

    private EditText inputEmail;
    private EditText inputName;
    private EditText inputLastName;
    private EditText inputAge;
    private RadioButton inputMale;
    private RadioButton inputFemale;

    private String urlRegisterClient = "https://db-pais.herokuapp.com/client/register";


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_in);

        inputEmail = findViewById(R.id.editTextEmail);
        inputName = findViewById(R.id.editTextName);
        inputLastName = findViewById(R.id.editTextLastName);
        inputAge = findViewById(R.id.editTextAge);
        inputMale = findViewById(R.id.radioMale);
        inputFemale = findViewById(R.id.radioFemale);

    }

    public void onSignInClick(View view) {

        String email = inputEmail.getText().toString();
        String name = inputName.getText().toString();
        String lastName = inputLastName.getText().toString();
        String age = inputAge.getText().toString();
        String gender = "";
        if(inputMale.isChecked()){
            gender = "Masculino";
        }
        if(inputFemale.isChecked()){
            gender = "Femenino";
        }
        if(email.equals("")){
            inputEmail.setError("Campo obligatorio");
        }else{
            sendRequest(email, name, lastName, age,gender);
            Toast.makeText(this,"Por favor revise su correo para conocer usuario y contraseña",Toast.LENGTH_LONG).show();
            Intent intent = new Intent(this,LoginActivity.class);
            startActivity(intent);
        }
    }

    public void onBackClick(View view) {
        Intent intent = new Intent(this, LoginActivity.class);
        startActivity(intent);
    }

    public void sendRequest(final String email, final String name, final String lastName, final String age, final String gender) {
        RequestQueue requestQueue = Volley.newRequestQueue(this);
        StringRequest postRequest = new StringRequest(Request.Method.POST, urlRegisterClient,
                new Response.Listener<String>()
                {
                    @Override
                    public void onResponse(String response) {
                        // response
                        Log.d("Response", response);
                    }
                },
                new Response.ErrorListener()
                {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        // error
                        Log.d("Error.Response", error.toString());
                    }
                }
        ) {
            @Override
            protected Map<String, String> getParams() throws AuthFailureError {
                Map<String,String> params = new HashMap<String,String>();
                params.put("correo", email);
                if (name.isEmpty()){params.put("nombre",name);}
                if (lastName.isEmpty()){params.put("apellido",lastName);}
                if (age.isEmpty()){params.put("edad",age);}
                if (gender.isEmpty()){params.put("nombre",gender);}
                return params;
            }
        };
        requestQueue.add(postRequest);
    }

}

