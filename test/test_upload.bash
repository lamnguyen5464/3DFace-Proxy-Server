# base64 img
base64 -i img_demo.png >  img_base64.txt

BASE64_IMG=$(cat img_base64.txt)

echo "start request..."
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"image": "data:image/png;base64,'"$BASE64_IMG"'"}' \
  http://localhost:3000/upload-image-base64
