package backend.web.rest;

import backend.dto.request.UserRequest;
import backend.entity.User;
import backend.mapper.UserMapper;
import backend.service.AuthService;
import backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

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

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/upload-thumbnail")
    public @ResponseBody
    void uploadThumbnail(@RequestParam("thumbnail") MultipartFile file) throws IOException {
        User user = userService.loadUserById(authService.getLoggedUser().getId());
        userService.uploadThumbnail(user, compressBytes(file.getBytes()));
    }

    @GetMapping(path = { "/get-thumbnail" })
    public @ResponseBody
    byte[] getImage() throws IOException {
        byte[] thumbnail= userService.getThumbnailById(authService.getLoggedUser().getId());
        return decompressBytes(thumbnail);
    }

    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
        }
        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);

        return outputStream.toByteArray();
    }

    public static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException | DataFormatException ioe) {
        }
        return outputStream.toByteArray();
    }
}
