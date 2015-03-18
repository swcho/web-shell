#!/usr/bin/env bash

echo "Hi! $1"

sleep 1

>&2 echo "This is error message"

sleep 1

echo -e "\e[31mLet's try red\e[0m"

sleep 1

echo "Bye bye~"