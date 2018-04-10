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


    private Button btnSignIN;
    private Button btnBack;
    private EditText inputEmail;
    private EditText inputName1;
    private EditText inputName2;
    private EditText inputLastName1;
    private EditText inputlastName2;
    private EditText inputAge;
    private RadioButton inputMale;
    private RadioButton inputFemale;

    private RequestQueue requestQueue;
    private String urlRegisterClient = "https://db-pais.herokuapp.com/client/register";


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_in);

        inputEmail = findViewById(R.id.editTextEmail);
        inputName1 = findViewById(R.id.editTextName1);
        inputName2 = findViewById(R.id.editTextName2);
        inputLastName1 = findViewById(R.id.editTextLastName1);
        inputlastName2 = findViewById(R.id.editTextLastName2);
        inputAge = findViewById(R.id.editTextAge);


        btnSignIN = findViewById(R.id.btnSignIn);
        btnBack = findViewById(R.id.btnBack);

    }




    public void onSignInClick(View view) {




        String email = inputEmail.getText().toString();

        if(email.equals("")){
            inputEmail.setError("Campo obligatorio");
        }else{
            sendRequest(email);

            Intent intent = new Intent(this,LoginActivity.class);
            startActivity(intent);
        }

        //

        /*Intent intent = new Intent(Intent.ACTION_SENDTO); // it's not ACTION_SEND
        intent.setType("text/plain");
        intent.putExtra(Intent.EXTRA_SUBJECT, "Welcome to FarmacApp");
        intent.putExtra(Intent.EXTRA_TEXT, "This is your username: "+ name1 + " and your password is: dsadafs");
        intent.setData(Uri.parse("mailto:"+email)); // or just "mailto:" for blank
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK); // this will make such that when user returns to your app, your app is displayed, instead of the email app.
        try {
            startActivity(Intent.createChooser(intent, "Send mail..."));
        } catch (android.content.ActivityNotFoundException ex) {
            Toast.makeText(this, "There are no email clients installed.", Toast.LENGTH_SHORT).show();
        }*/
    }

    public void onBackClick(View view) {
        Intent intent = new Intent(this, LoginActivity.class);
        startActivity(intent);
    }

    public void sendRequest(final String email) {
        requestQueue = Volley.newRequestQueue(this);

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
                return params;
            }
        };
        requestQueue.add(postRequest);
    }

}
/*


) {
    @Override
    protected Map<String, String> getParams()
    {
            Map<String, String>  params = new HashMap<String, String>();
            params.put("name", "Alif");
            params.put("domain", "http://itsalif.info");

            return params;
    }
};
queue.add(postRequest);

*/
