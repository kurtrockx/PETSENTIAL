<?php

require_once "./includes/cors.php";
require '../../vendor/autoload.php'; // Composer autoload for MongoDB
require_once './includes/atlas.php';

$db = $client->pormaHUB; // Database connection
$collection = $db->usersCollection;

$inputData = file_get_contents("php://input");
$data = json_decode($inputData, true);

header('Content-Type: application/json');

try {
    // Validate incoming JSON data
    if (!$data) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON data']);
        exit;
    }

    // Validate the action
    if (isset($data['action']) && $data['action'] == 'addAppointment') {
        // Check required fields
        if (!isset($data['userId']) || !isset($data['appointment'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing userId or appointment']);
            exit;
        }

        $userId = $data['userId'];
        $appointment = $data['appointment'];

        // Validate userId format
        if (!MongoDB\BSON\ObjectId::isValid($userId)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid userId']);
            exit;
        }

        // Update the user's document with the new appointment
        $result = $collection->updateOne(
            ['_id' => new MongoDB\BSON\ObjectId($userId)], // Match user by _id
            ['$push' => ['appointments' => $appointment]] // Push to appointments array
        );

        // Check the result of the update operation
        if ($result->getMatchedCount() == 0) {
            http_response_code(404);
            echo json_encode(['error' => 'No user found with the provided userId']);
            exit;
        }

        if ($result->getModifiedCount() > 0) {
            echo json_encode(['message' => 'Appointment added successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to add appointment']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid action']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to add appointment: ' . $e->getMessage()]);
}
