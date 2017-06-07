statusresponse=$(curl --write-out %{http_code} --silent --output /dev/null https://aqueous-fortress-45740.herokuapp.com/http://omgyoutube.com)

if [ $statusresponse == 503 ]
then
	heroku restart -a aqueous-fortress-45740
else
	echo "thik chha"
fi
