#!/bin/bash

echo "Starting servers..."

# Change to backend directory
cd backend
echo "Current working directory: $(pwd)"

# Start backend server
npm start &
echo "Backend server started."

# Wait for backend server to start
sleep 10

# Change to frontend directory
cd ../frontend
echo "Current working directory: $(pwd)"

# Start frontend server
npm start
echo "Frontend server started."

echo "Servers started."
