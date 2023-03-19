
echo "start request..."
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"id": "123zyx", "item": "hair_male_2"}' \
  http://localhost:3000/decor > result.obj

# rm .test_decor.bash.swp