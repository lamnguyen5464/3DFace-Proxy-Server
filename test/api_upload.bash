# base64 img
base64 -i img_demo.png >  img_base64.txt

BASE64_IMG=$(cat img_base64.txt)

echo "start request upload..."
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"image": "data:image/png;base64,'"$BASE64_IMG"'", "token": "123zyx"}' \
  http://c967-115-79-229-226.ngrok.io/upload-image-base64 > result.obj

# rm .test_upload.bash.swp
rm img_base64.txt