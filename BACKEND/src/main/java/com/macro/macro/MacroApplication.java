package com.macro.macro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class MacroApplication {

	public static void main(String[] args) {
		SpringApplication.run(MacroApplication.class, args);
	}

}
