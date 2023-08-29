token=$(hexdump -vn16 -e'4/4 "%08X" 1 "\n"' /dev/urandom)
curl 154.53.61.106:19027/tunnel -d "{\"token\":\""$(echo $token)"\"}" -H "content-type: application/json" -i
