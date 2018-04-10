package com.example.andre.appfarmacia;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.example.andre.appfarmacia.Entities.User;

import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class LoginActivity extends AppCompatActivity {

    private Button btnLogin;
    private Button btnRegister;
    private EditText inputEmail;
    private EditText inputPassword;
    private String urlLoginClient = "https://db-pais.herokuapp.com/client/login";

            private RequestQueue requestQueue;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);


        inputEmail = (EditText) findViewById(R.id.inputUser);
        inputPassword = (EditText) findViewById(R.id.inputPass);
        btnLogin = (Button) findViewById(R.id.buttonLogin);
        btnRegister = (Button) findViewById(R.id.buttonRegister);

    }

    public void onLoginClick(View view){

        String email = inputEmail.getText().toString();
        String password = inputPassword.getText().toString();

        checkLogin();


        if(email.isEmpty() || password.isEmpty()){
            Toast.makeText(getApplicationContext(),"Por favor ingrese credenciales",Toast.LENGTH_LONG).show();
        }else{
            checkLogin();
            if(email.equals("user") && password.equals("pass")) {
                Intent intent = new Intent(this, MainActivity.class);
                startActivity(intent);
            }else {
                Toast.makeText(getApplicationContext(),"Crendenciales Incorrectas",Toast.LENGTH_LONG).show();
            }
        }
    }

    public void onRegisterClick(View view) {
        Intent intent = new Intent(this, SignInActivity.class);
        startActivity(intent);
    }

    private void checkLogin() {

        requestQueue = Volley.newRequestQueue(this);
        StringRequest postRequest = new StringRequest(Request.Method.POST, urlLoginClient,
                new Response.Listener<String>(){
                    @Override
                    public void onResponse(String response) {
                        // response
                        Log.d("Response", response);
                    }
                },
                new Response.ErrorListener(){
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        // error
                        Log.d("Error.Response", error.toString());
                    }
                }
        ) {
            @Override
            protected Map<String, String> getParams() throws AuthFailureError {
                Map<String, String> params = new HashMap<String, String>();
                params.put("correo", "jp@x.com");
                params.put("password", "w5SshZ3A");
                return params;
            }
        };

        Log.d("Request", postRequest.toString());
        requestQueue.add(postRequest);

        /*try {
            if(email.equals("user") && password.equals("pass")) {



                Intent intent = new Intent(this, MainActivity.class);
                startActivity(intent);
            }
        }catch (Exception e) {
        }*/
    }
}
