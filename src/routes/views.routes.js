import { Router } from "express";
import passport from "passport";
import { generateToken } from "../utils/index.js"

const router = Router();

router.get("/", (req, res) => {
  res.render("home", { title: "HOME", user: res.locals.user });
});

router.get("/register", (req, res) => {
  res.render("register", { title: "Register", user: res.locals.user });
});

router.get("/login", (req, res) => {
  res.render("login", { title: "Login", user: res.locals.user });
});

router.get("/sobre-nosotros", (req, res) => {
  res.render("sobrenosotros", { title: "Sobre nosotros", user: res.locals.user });
});

router.get("/servicios", (req, res) => {
  res.render("servicios", { title: "Servicios", user: res.locals.user });
});

router.get("/contacto", (req, res) => {
  res.render("contacto", { title: "Contacto", user: res.locals.user });
});

router.get("/current", (req, res) => {
  const user = { ...req.user };
  res.render("current", { title: "Current", user: user._doc });
});

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const token = generateToken(req.user);

    res
      .cookie("authToken", token, {
        signed: true,
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      })
      .redirect("/");
  }
);

router.get("/recupero", (req, res) => {
  res.render("recupero", { title: "Recuperar pass" });
});


export default router;
