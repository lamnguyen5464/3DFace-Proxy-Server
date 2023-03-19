
echo "start request decor..."
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"token": "123zyx", "item": "hair_male_2"}' \
  http://c967-115-79-229-226.ngrok.io/decor > result.obj

# rm .test_decor.bash.swp