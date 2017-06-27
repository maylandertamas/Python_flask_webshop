from flask import Flask, render_template, session, redirect, url_for, request, Response, jsonify
from database_handler import database_handler
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/get-boards")
def get_boards():
    board_data = database_handler("SELECT * FROM boards;")
    list_board_data = [list(element) for element in board_data]
    for element in list_board_data:
        x = element[0]
        card_data = database_handler("SELECT * FROM cards WHERE boards_id = {0};".format(x))
        element.append(card_data)
    return jsonify(data=list_board_data)


if __name__ == '__main__':
    app.run(debug=True)


print(get_boards())