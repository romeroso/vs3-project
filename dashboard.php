<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header("Location: index.html");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Health Tracker</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <div class="form-container">
            <h2>Welcome, <?php echo htmlspecialchars($_SESSION['email']); ?></h2>
            <p style="text-align: center; margin-bottom: 20px;">You are now logged in!</p>
            <form action="logout.php" method="POST">
                <button type="submit">Logout</button>
            </form>
        </div>
    </div>
</body>
</html>