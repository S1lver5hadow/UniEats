from django.test import TestCase

class ExampleTestCase(TestCase):
    def test_example(self):
        self.assertTrue(True)
        self.assertFalse(2 == 1)
        self.assertEqual(1 + 2, 3)
