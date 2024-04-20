package com.example.crudProductos.config;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;

public class AppConfig {
    @Bean
    public Cloudinary cloudinary() {
        Cloudinary cloudinary = new Cloudinary("cloudinary://488858765467343:C_CxU2LdB7Di2aHk_u9fHdbvsoQ@di4psynpm");
        return cloudinary;
    }
}
