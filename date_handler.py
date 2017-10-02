"""Handliing Dates formats."""
import pandas as pd
months = ["january", "february", "march", "april",
          "may", "june", "july", "august",
          "september", "october", "november", "december",
          "jan", "Feb", "mar", "apr", "may", "jun", "jul",
          "aug", "sep", "oct", "nov", "dec"]
seperator = ['-', '.', '/', ' ', ':', ';', '$', '%', '&',
             '@', '#', '!', '\\', ')', '(', '*', '^', '?', '??']


def process_date(string_text):
    """Converting dates into a fix format(day-month-year or day-month)."""
    store = []
    for key in string_text:
        # Taking data from string_text.
        if key.isdigit():
            converted = key
        else:
            try:
                converted = pd.to_datetime(key).date()
                converted = converted.strftime(
                    '%d') + '-' + converted.strftime
                ('%B') + '-' + converted.strftime('%Y')
            except:
                try:
                    date_map = {}
                    # Temporary date will store in dictionary.
                    date_format = '{}-%d'
                    # Manual fixed a format (month-day).
                    date_str = "{month}-{date}"
                    for s in seperator:
                        splited_date = key.lower().split(s)
                        if len(splited_date) > 1:
                            is_valid = set(months).intersection(
                                set(splited_date))
                            if len(is_valid) > 0:
                                month = list(is_valid)[0]
                                month_format = '%B' if len(month) > 3 else '%b'
                                # Checking for full name of month or only first
                                # 3 letters.
                                date_format = date_format.format(month_format)
                                for date_key in splited_date:
                                    if date_key.isdigit():
                                        if (int(
                                                date_key) <= 31 and int(
                                                date_key) > 0):
                                            date_map['date'] = date_key
                                        # Checking for date between 1 to 31.
                                    else:
                                        date_map['month'] = date_key

                                if 'date' in date_map:
                                    date_str = date_str.format(**date_map)
                            else:
                                date_str = key
                    if len(date_str) > 0:
                        converted = pd.to_datetime(
                            date_str, format=date_format).date()
                        converted = converted.strftime(
                            '%d') + '-' + converted.strftime('%B')
                except:
                    converted = key
        store.append(converted)
    string_text = ' '.join(store)
    # Store and return the list after join.
    return string_text
