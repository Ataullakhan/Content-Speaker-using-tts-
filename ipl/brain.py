"""Test function."""
import json
import date_handler as dh


def call_date(handler):
    """Newfunctionforcallingallmethod."""
    string_text = handler.get_argument('cont').split()
    x = dh.process_date(string_text)
    return json.dumps(x)
