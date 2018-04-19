package com.example.andre.appfarmacia;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
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
    public static final String MyPREFERENCES = "MyPrefs" ;
    public static final String user = "userKey";
    public static final String pass = "passKey";

    private RequestQueue requestQueue;
    private SharedPreferences sharedPreferences;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);


        inputEmail = findViewById(R.id.inputUser);
        inputPassword = findViewById(R.id.inputPass);
        btnLogin = findViewById(R.id.buttonLogin);
        btnRegister = findViewById(R.id.buttonRegister);

        sharedPreferences= getSharedPreferences(MyPREFERENCES, Context.MODE_PRIVATE);

    }

    public void onLoginClick(View view){

        String username = inputEmail.getText().toString();
        String password = inputPassword.getText().toString();



        if(username.isEmpty() || password.isEmpty()){
            Toast.makeText(getApplicationContext(),"Por favor ingrese credenciales",Toast.LENGTH_LONG).show();
        }else{
            checkLogin(username,password);

        }
    }

    public void onRegisterClick(View view) {
        Intent intent = new Intent(this, SignInActivity.class);
        startActivity(intent);
    }

    private void checkLogin(final String user, final String pass) {

        requestQueue = Volley.newRequestQueue(this);
        StringRequest postRequest = new StringRequest(Request.Method.POST, urlLoginClient,
                new Response.Listener<String>(){
                    @Override
                    public void onResponse(String response) {
                        // response
                        if (!response.equals("ok")){
                            Toast.makeText(getApplicationContext(),"Crendenciales Incorrectas",Toast.LENGTH_LONG).show();
                        }else {
                            /*SharedPreferences.Editor editor = sharedPreferences.edit();
                            editor.putString(user,username);
                            editor.putString(pass,password);
                            editor.commit();*/
                            Intent intent = new Intent(getApplicationContext(), MainActivity.class);
                            startActivity(intent);
                        }
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
                params.put("usuario", user);
                params.put("clave", pass);
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
