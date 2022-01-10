from glob import glob
import os

file_names = glob("NFTImage/*")
for ind, file_name in enumerate(file_names):
    os.rename(file_name, f"{ind}.png")
