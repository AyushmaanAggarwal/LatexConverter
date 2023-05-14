import sys

#assert len(sys.argv)==2, "Need to pass in string into python program"
# Get string
#copy_string = sys.argv[1]
def converter(copy_string):
    assert type(copy_string)==type(""), "Invalid parameter into python program"
    
    conv_dict = {}
    with open("symbols", "r") as file:
        for line in file:
            key, value = line.split(":", 1)
            conv_dict[key] = value

    for symbol in conv_dict.keys():
        replacement = conv_dict[symbol]
        copy_string = copy_string.replace(symbol, replacement)

    return copy_string
