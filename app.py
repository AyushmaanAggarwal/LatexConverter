try:
    from flask import Flask, render_template, request
    import requests
except ImportError:
    print('Error, flask, requests not installed or found on system')
    print('Please run pip install flask requests')

from replaceLatexSymbols import converter

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        copied_text = request.form['copiedText']
        text = converter(copied_text)
        return render_template('boostraped_home.html', output_txt=text, input_txt=copied_text)
    return render_template('boostraped_home.html', output_txt="", input_txt="")


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000)