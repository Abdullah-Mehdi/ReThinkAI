FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8001

# Set the command to run the Flask app
CMD ["flask", "run", "--host", "0.0.0.0", "--port", "8001"]
