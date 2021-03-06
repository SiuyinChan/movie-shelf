package backend.web.rest;

import backend.dto.request.LoginRequest;
import backend.dto.request.RegisterRequest;
import backend.dto.response.LoginResponse;
import backend.dto.response.UserResponse;
import backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody
    UserResponse userPostRegister(@Valid @RequestBody RegisterRequest registerRequest) {
        return authService.register(registerRequest);
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody
    LoginResponse userPostLogin(@Valid @RequestBody LoginRequest loginRequest) {
        return authService.login(loginRequest);
    }
}

