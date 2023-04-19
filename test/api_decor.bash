
echo "start request decor..."
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"token": "123zyx", "item": "hair_male_2"}' \
  http://localhost:3000/decor > result.obj

# rm .test_decor.bash.swp