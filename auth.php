<?php
session_start();

// Database connection
$host = 'localhost';
$dbname = 'health_tracker';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    if ($action === 'signup') {
        $confirm_password = $_POST['confirm_password'];
        
        if ($password !== $confirm_password) {
            header("Location: index.html?error=Passwords do not match");
            exit();
        }

        // Check if user already exists
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        
        if ($stmt->rowCount() > 0) {
            header("Location: index.html?error=Email already exists");
            exit();
        }

        // Create new user
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
        
        try {
            $stmt->execute([$email, $hashed_password]);
            header("Location: index.html?success=Account created successfully");
            exit();
        } catch(PDOException $e) {
            header("Location: index.html?error=Registration failed");
            exit();
        }
    }
    
    elseif ($action === 'login') {
        $stmt = $pdo->prepare("SELECT id, email, password FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['email'] = $user['email'];
            header("Location: dashboard.php");
            exit();
        } else {
            header("Location: index.html?error=Invalid email or password");
            exit();
        }
    }
}
?>