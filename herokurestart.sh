statusresponse=$(curl --write-out %{http_code} --silent --output /dev/null https://whispering-forest-28906.herokuapp.com/http://omgyoutube.com)

if [ $statusresponse == 503 ]
then
	heroku restart -a whispering-forest-28906
else
	echo "thik chha"
fi
