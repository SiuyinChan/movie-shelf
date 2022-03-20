package backend.web.rest;

import backend.dto.request.UserRequest;
import backend.entity.User;
import backend.mapper.UserMapper;
import backend.service.AuthService;
import backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/user")
public class UserController {
    private final AuthService authService;
    private final UserService userService;

    @Autowired
    public UserController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(path = "/info", method = RequestMethod.GET)
    public @ResponseBody
    User tokenGetMe() {
        return authService.getLoggedUser();
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(path = "/delete", method = RequestMethod.DELETE)
    public @ResponseBody
    void deleteUser() {
        userService.deleteUserById(authService.getLoggedUser().getId());
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(path = "/update", method = RequestMethod.PATCH)
    public @ResponseBody
    User updateUser(@Valid @RequestBody UserRequest userRequest) {
        User user = userService.loadUserById(authService.getLoggedUser().getId());
        UserMapper.requestToUser(userRequest, user);
        return userService.save(user);
    }
}
