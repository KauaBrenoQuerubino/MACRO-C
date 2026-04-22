package com.macro.macro;

import com.google.cloud.Timestamp;
import com.macro.macro.Model.*;
import com.macro.macro.Repository.Firebase;
import com.macro.macro.Service.*;
import org.checkerframework.checker.units.qual.C;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class MacroApplication {
	public static void main(String[] args) {
		SpringApplication.run(MacroApplication.class, args);
	}
}
