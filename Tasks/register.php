<?php
include 'config.php';

if (isset($_POST['submit'])) {
   $name = mysqli_real_escape_string($conn, $_POST['name']);
   $email = mysqli_real_escape_string($conn, $_POST['email']);
   $pass = mysqli_real_escape_string($conn, $_POST['password']);
   $cpass = mysqli_real_escape_string($conn, $_POST['cpassword']);
   $image = $_FILES['image']['name'];
   $image_size = $_FILES['image']['size'];
   $image_tmp_name = $_FILES['image']['tmp_name'];
   $image_folder = 'uploaded_img/' . $image;

   // Check if user already exists (only by email)
   $select = mysqli_query($conn, "SELECT * FROM `user_form` WHERE email = '$email'")
       or die('Query failed: ' . mysqli_error($conn));

   if (mysqli_num_rows($select) > 0) {
      echo "<script>alert('User already exists! Try another email.'); window.location.href = 'register.php';</script>";
   } elseif ($pass !== $cpass) {
      echo "<script>alert('Confirm password does not match!'); window.location.href = 'register.php';</script>";
   } elseif ($image_size > 2000000) {
      echo "<script>alert('Image size is too large!'); window.location.href = 'register.php';</script>";
   } else {
      $insert = mysqli_query($conn, "INSERT INTO `user_form` (name, email, password, image) VALUES ('$name', '$email', '$pass', '$image')")
         or die('Insert failed: ' . mysqli_error($conn));

      if ($insert) {
         move_uploaded_file($image_tmp_name, $image_folder);
         echo "<script>alert('Registered successfully!'); window.location.href = 'login.php';</script>";
      } else {
         echo "<script>alert('Registration failed!'); window.location.href = 'register.php';</script>";
      }
   }
}
?>



<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>register</title>

   <!-- custom css file link  -->
   <link rel="stylesheet" href="login.css">

</head>
<body>
   
<div class="form-container">

   <form action="" method="post" enctype="multipart/form-data">
      <h3>register now</h3>
      <?php
      if(isset($message)){
         foreach($message as $message){
            echo '<div class="message">'.$message.'</div>';
         }
      }
      ?>
      <input type="text" name="name" placeholder="enter username" class="box" required>
      <input type="email" name="email" placeholder="enter email" class="box" required>
      <input type="password" name="password" placeholder="enter password" class="box" required>
      <input type="password" name="cpassword" placeholder="confirm password" class="box" required>
      <input type="file" name="image" class="box" accept="image/jpg, image/jpeg, image/png">
      <input type="submit" name="submit" value="register now" class="btn">
      <p>already have an account? <a href="login.php">login now</a></p>
   </form>

</div>

</body>
</html>