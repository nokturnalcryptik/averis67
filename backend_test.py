#!/usr/bin/env python3
"""
Backend API Testing for Prova Clone
Tests all API endpoints for functionality and data structure
"""

import requests
import json
import sys
from typing import Dict, Any, List

# Get backend URL from frontend env
BACKEND_URL = "https://prova-copy.preview.emergentagent.com/api"

class BackendTester:
    def __init__(self):
        self.results = {}
        self.total_tests = 0
        self.passed_tests = 0
        self.failed_tests = 0

    def log_result(self, test_name: str, success: bool, message: str, data: Any = None):
        """Log test result"""
        self.total_tests += 1
        if success:
            self.passed_tests += 1
            status = "✅ PASS"
        else:
            self.failed_tests += 1
            status = "❌ FAIL"
        
        self.results[test_name] = {
            "status": status,
            "success": success,
            "message": message,
            "data": data
        }
        print(f"{status}: {test_name} - {message}")

    def test_get_endpoint(self, endpoint: str, expected_keys: List[str], expected_counts: Dict[str, int] = None):
        """Test GET endpoint with expected response structure"""
        try:
            response = requests.get(f"{BACKEND_URL}{endpoint}", timeout=10)
            
            if response.status_code != 200:
                self.log_result(f"GET {endpoint}", False, f"HTTP {response.status_code}: {response.text}")
                return False
            
            try:
                data = response.json()
            except json.JSONDecodeError:
                self.log_result(f"GET {endpoint}", False, "Invalid JSON response")
                return False
            
            # Check expected keys
            missing_keys = [key for key in expected_keys if key not in data]
            if missing_keys:
                self.log_result(f"GET {endpoint}", False, f"Missing keys: {missing_keys}")
                return False
            
            # Check expected counts if provided
            if expected_counts:
                for key, expected_count in expected_counts.items():
                    if key in data and isinstance(data[key], list):
                        actual_count = len(data[key])
                        if actual_count != expected_count:
                            self.log_result(f"GET {endpoint}", False, 
                                          f"Expected {expected_count} {key}, got {actual_count}")
                            return False
            
            self.log_result(f"GET {endpoint}", True, "Response structure valid", data)
            return True
            
        except requests.exceptions.RequestException as e:
            self.log_result(f"GET {endpoint}", False, f"Request failed: {str(e)}")
            return False

    def test_post_endpoint(self, endpoint: str, payload: Dict[str, Any], expected_keys: List[str]):
        """Test POST endpoint with payload"""
        try:
            response = requests.post(f"{BACKEND_URL}{endpoint}", 
                                   json=payload, 
                                   headers={"Content-Type": "application/json"},
                                   timeout=10)
            
            if response.status_code not in [200, 201]:
                self.log_result(f"POST {endpoint}", False, f"HTTP {response.status_code}: {response.text}")
                return False
            
            try:
                data = response.json()
            except json.JSONDecodeError:
                self.log_result(f"POST {endpoint}", False, "Invalid JSON response")
                return False
            
            # Check expected keys
            missing_keys = [key for key in expected_keys if key not in data]
            if missing_keys:
                self.log_result(f"POST {endpoint}", False, f"Missing keys: {missing_keys}")
                return False
            
            # Check success field if present
            if "success" in data and not data["success"]:
                self.log_result(f"POST {endpoint}", False, "Response indicates failure")
                return False
            
            self.log_result(f"POST {endpoint}", True, "Request successful", data)
            return True
            
        except requests.exceptions.RequestException as e:
            self.log_result(f"POST {endpoint}", False, f"Request failed: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all backend API tests"""
        print(f"🚀 Starting Backend API Tests for: {BACKEND_URL}")
        print("=" * 60)
        
        # Test 1: Root endpoint
        self.test_get_endpoint("/", ["message"])
        
        # Test 2: Groups endpoint - should return 12 groups
        self.test_get_endpoint("/groups", ["groups"], {"groups": 12})
        
        # Test 3: Stats endpoint - should return 4 stats
        self.test_get_endpoint("/stats", ["stats"], {"stats": 4})
        
        # Test 4: Features endpoint - should return tabs, case_items, case_tags
        self.test_get_endpoint("/features", ["tabs", "case_items", "case_tags"], 
                             {"tabs": 9, "case_items": 3, "case_tags": 5})
        
        # Test 5: Testimonials endpoint - should return 6 testimonials
        self.test_get_endpoint("/testimonials", ["testimonials"], {"testimonials": 6})
        
        # Test 6: Pricing endpoint - should return 3 plans
        self.test_get_endpoint("/pricing", ["plans"], {"plans": 3})
        
        # Test 7: FAQ endpoint - should return 8 items
        self.test_get_endpoint("/faq", ["items"], {"items": 8})
        
        # Test 8: Guides endpoint - should return 4 articles
        self.test_get_endpoint("/guides", ["articles"], {"articles": 4})
        
        # Test 9: Contact form submission
        contact_payload = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "message": "This is a test contact message from the backend testing suite."
        }
        self.test_post_endpoint("/contact", contact_payload, ["success", "id"])
        
        # Test 10: Waitlist submission
        waitlist_payload = {
            "prompt": "I want to test the ProvAI waitlist feature for automated moderation."
        }
        self.test_post_endpoint("/waitlist", waitlist_payload, ["success", "id"])

    def print_summary(self):
        """Print test summary"""
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {self.total_tests}")
        print(f"Passed: {self.passed_tests}")
        print(f"Failed: {self.failed_tests}")
        print(f"Success Rate: {(self.passed_tests/self.total_tests*100):.1f}%")
        
        if self.failed_tests > 0:
            print("\n❌ FAILED TESTS:")
            for test_name, result in self.results.items():
                if not result["success"]:
                    print(f"  - {test_name}: {result['message']}")
        
        print("\n✅ PASSED TESTS:")
        for test_name, result in self.results.items():
            if result["success"]:
                print(f"  - {test_name}")

    def validate_data_structures(self):
        """Validate specific data structures from successful tests"""
        print("\n🔍 VALIDATING DATA STRUCTURES")
        print("=" * 60)
        
        # Validate groups structure
        if "GET /groups" in self.results and self.results["GET /groups"]["success"]:
            groups_data = self.results["GET /groups"]["data"]
            if "groups" in groups_data and len(groups_data["groups"]) > 0:
                group = groups_data["groups"][0]
                required_fields = ["id", "name", "logo_url"]
                missing = [f for f in required_fields if f not in group]
                if missing:
                    print(f"❌ Groups missing fields: {missing}")
                else:
                    print("✅ Groups structure valid")
        
        # Validate stats structure
        if "GET /stats" in self.results and self.results["GET /stats"]["success"]:
            stats_data = self.results["GET /stats"]["data"]
            if "stats" in stats_data and len(stats_data["stats"]) > 0:
                stat = stats_data["stats"][0]
                required_fields = ["id", "label", "value", "suffix", "is_decimal"]
                missing = [f for f in required_fields if f not in stat]
                if missing:
                    print(f"❌ Stats missing fields: {missing}")
                else:
                    print("✅ Stats structure valid")
        
        # Validate testimonials structure
        if "GET /testimonials" in self.results and self.results["GET /testimonials"]["success"]:
            testimonials_data = self.results["GET /testimonials"]["data"]
            if "testimonials" in testimonials_data and len(testimonials_data["testimonials"]) > 0:
                testimonial = testimonials_data["testimonials"][0]
                required_fields = ["id", "text", "name", "initials", "role", "group_name"]
                missing = [f for f in required_fields if f not in testimonial]
                if missing:
                    print(f"❌ Testimonials missing fields: {missing}")
                else:
                    print("✅ Testimonials structure valid")

def main():
    """Main test execution"""
    tester = BackendTester()
    
    try:
        tester.run_all_tests()
        tester.validate_data_structures()
        tester.print_summary()
        
        # Exit with error code if any tests failed
        if tester.failed_tests > 0:
            sys.exit(1)
        else:
            print("\n🎉 All tests passed!")
            sys.exit(0)
            
    except KeyboardInterrupt:
        print("\n⚠️ Tests interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n💥 Unexpected error: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()