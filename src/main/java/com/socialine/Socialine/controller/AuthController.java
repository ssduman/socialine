package com.socialine.Socialine.controller;

import com.socialine.Socialine.utils.EmailSender;
import com.socialine.Socialine.dto.EmailRequest;
import com.socialine.Socialine.dto.LoginRequest;
import com.socialine.Socialine.dto.PasswordResetRequest;
import com.socialine.Socialine.dto.RegisterRequest;
import com.socialine.Socialine.model.Users;
import com.socialine.Socialine.model.VerificationToken;
import com.socialine.Socialine.repository.UsersRepository;
import com.socialine.Socialine.repository.VerificationTokenRepository;
import com.socialine.Socialine.security.JwtProvider;
import com.socialine.Socialine.service.AuthService;
import com.socialine.Socialine.service.UsersService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@AllArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtProvider jwtProvider;
    private final EmailSender emailSender;
    private final UsersService usersService;
    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final VerificationTokenRepository verificationTokenRepository;

    @GetMapping("/api")
    public ResponseEntity<HashMap<String, Object>> rememberMe(@RequestHeader("Authorization") String token, @RequestHeader("username") String username) {
        HashMap<String, Object> ret = new HashMap<>();

        try {
            ret.put("res", jwtProvider.rememberMe(token.substring(7), username));
        } catch (Exception e) {
            System.out.println("/api jwt exception:" + e);
        }

        return new ResponseEntity<>(ret, HttpStatus.OK);
    }

    @PostMapping("/api/register")
    public ResponseEntity<HashMap<String, Object>> addUser(@RequestBody RegisterRequest user) {
        HashMap<String, Object> ret = new HashMap<>();

        if (usersRepository.findByName(user.getName()) != null) {
            ret.put("res", "user exists");
            return new ResponseEntity<>(ret, HttpStatus.FORBIDDEN);
        }
        if (usersRepository.findByEmail(user.getEmail()) != null) {
            ret.put("res", "user exists");
            return new ResponseEntity<>(ret, HttpStatus.FORBIDDEN);
        }

        Users newUser = new Users();
        newUser.setRealName(user.getRealName());
        newUser.setName(user.getName());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));

        newUser.setIsVerified(1);
        newUser.setIsPassChange(0);
        newUser.setIsAdmin(user.getIsAdmin());

        LocalDate now = LocalDate.now();
        newUser.setRegDate(now);
        newUser.setLastLogin(now);
        newUser.setLastWrongAttempt(null);
        newUser.setQuestionnaireAnswered(null);

        String token = generateVerificationToken(newUser, 0);
        System.out.println(token);

        EmailRequest emailRequest = new EmailRequest();
        String link = "https://socialine.herokuapp.com/api/verify/" + token;
        emailRequest.setText(String.format("Go to: <a href='%s'>%s</a>", link, link));
        emailRequest.setEmail(newUser.getEmail());
        emailRequest.setSubject("Email Verification");
        emailSender.sendEmail(emailRequest);

        ret.put("res", "success");
        return new ResponseEntity<>(ret, HttpStatus.OK);
    }

    @PostMapping("/api/login")
    public ResponseEntity<HashMap<String, Object>> login(@RequestBody LoginRequest loginRequest) throws Exception {
        HashMap<String, Object> ret = new HashMap<>();

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getName(), loginRequest.getPassword()));
        } catch (Exception e) {
            ret.put("res", "jwt not generated");
            return new ResponseEntity<>(ret, HttpStatus.BAD_REQUEST);
        }

        Users user = usersRepository.findByName(loginRequest.getName());
        if (user != null) {
            if (user.getIsVerified() == 0) {
                ret.put("res", "user not verified");
                return new ResponseEntity<>(ret, HttpStatus.BAD_REQUEST);
            } else {
                ret.put("res", "success");
                ret.put("userid", user.getId());
                ret.put("jwt", jwtProvider.generateToken(loginRequest.getName()));
                return new ResponseEntity<>(ret, HttpStatus.OK);
            }
        } else {
            ret.put("res", "user not found");
            return new ResponseEntity<>(ret, HttpStatus.OK);
        }
    }

    @PostMapping("/api/passreset")
    public ResponseEntity<HashMap<String, Object>> passReset(@RequestBody PasswordResetRequest passwordResetRequest) {
        HashMap<String, Object> ret = new HashMap<>();

        Users user = usersRepository.findByEmail(passwordResetRequest.getEmail());
        if (user == null) {
            ret.put("res", "user not exists");
            return new ResponseEntity<>(ret, HttpStatus.BAD_REQUEST);
        }

        String token = generateVerificationToken(user, 1);

        EmailRequest emailRequest = new EmailRequest();
        emailRequest.setText("Your token is: " + token);
        emailRequest.setEmail(user.getEmail());
        emailRequest.setSubject("Password Reset");
        emailSender.sendEmail(emailRequest);

        ret.put("res", "success");
        return new ResponseEntity<>(ret, HttpStatus.OK);
    }

    @PostMapping("/api/passreset/{token}")
    public ResponseEntity<HashMap<String, Object>> resetPass(@RequestBody PasswordResetRequest passwordResetRequest, @PathVariable String token) {
        HashMap<String, Object> ret = new HashMap<>();

        Users user = usersRepository.findByEmail(passwordResetRequest.getEmail());
        if (user == null) {
            ret.put("res", "user not exists");
            return new ResponseEntity<>(ret, HttpStatus.BAD_REQUEST);
        }

        Optional<VerificationToken> verificationToken = verificationTokenRepository.findByToken(token);
        if (verificationToken.isPresent()) {
            if (verificationToken.get().getType() != 1) {
                ret.put("res", "wrong token");
                return new ResponseEntity<>(ret, HttpStatus.BAD_REQUEST);
            }
            if (verificationToken.get().getUsed() != 0) {
                ret.put("res", "already used");
                return new ResponseEntity<>(ret, HttpStatus.BAD_REQUEST);
            }

            int userId = verificationToken.get().getUser().getId();
            Users tokenUser = usersService.getUserById(userId);
            if (tokenUser != null && user.getId() == tokenUser.getId()) {
                user.setPassword(passwordEncoder.encode(passwordResetRequest.getNewPassword()));
                usersRepository.save(user);
                verificationToken.get().setUsed(1);
                verificationTokenRepository.save(verificationToken.get());
            } else {
                ret.put("res", "bad token");
                return new ResponseEntity<>(ret, HttpStatus.BAD_REQUEST);
            }
        } else {
            ret.put("res", "token not exists");
            return new ResponseEntity<>(ret, HttpStatus.BAD_REQUEST);
        }

        ret.put("res", "success");
        return new ResponseEntity<>(ret, HttpStatus.OK);
    }

    @GetMapping("/api/passreset/{token}")
    public boolean resetPassRequest(@PathVariable String token) {
        Optional<VerificationToken> verificationToken = verificationTokenRepository.findByToken(token);
        if (verificationToken.isPresent()) {
            if (verificationToken.get().getType() != 1) {
                return false;
            }
            int userId = verificationToken.get().getUser().getId();
            Users user = usersService.getUserById(userId);
            return user != null;
        } else {
            return false;
        }
    }

    @GetMapping("/api/verify/{token}")
    public boolean verifyAccount(@PathVariable String token) {
        Optional<VerificationToken> verificationToken = verificationTokenRepository.findByToken(token);
        if (verificationToken.isPresent()) {
            if (verificationToken.get().getUsed() != 0) {
                return false;
            }
            if (verificationToken.get().getType() != 0) {
                return false;
            }
            int userId = verificationToken.get().getUser().getId();
            Users user = usersService.getUserById(userId);
            if (user != null) {
                user.setIsVerified(1);
                usersService.saveUser(user);
                verificationToken.get().setUsed(1);
                verificationTokenRepository.save(verificationToken.get());

                return true;
            }
        } else {
            return false;
        }

        return false;
    }

    private String generateVerificationToken(Users user, int type) {
        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setToken(token);
        verificationToken.setUser(user);
        verificationToken.setType(type);

        verificationTokenRepository.save(verificationToken);
        return token;
    }
}
